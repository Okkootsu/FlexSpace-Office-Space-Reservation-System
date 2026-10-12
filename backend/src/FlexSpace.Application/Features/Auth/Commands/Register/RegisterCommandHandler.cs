using System;
using System.Threading;
using System.Threading.Tasks;
using FlexSpace.Application.Common.Interfaces;
using FlexSpace.Domain.Entities;
using FlexSpace.Domain.Enums;
using MediatR;

namespace FlexSpace.Application.Features.Auth.Commands.Register
{
    public class RegisterCommandHandler : IRequestHandler<RegisterCommand, AuthResponse>
    {
        private readonly IUserRepository _userRepository;
        private readonly IPasswordHasher _passwordHasher;
        private readonly IJwtTokenGenerator _jwtTokenGenerator;
        private readonly IUnitOfWork _unitOfWork;

        public RegisterCommandHandler(
            IUserRepository userRepository,
            IPasswordHasher passwordHasher,
            IJwtTokenGenerator jwtTokenGenerator,
            IUnitOfWork unitOfWork)
        {
            _userRepository = userRepository;
            _passwordHasher = passwordHasher;
            _jwtTokenGenerator = jwtTokenGenerator;
            _unitOfWork = unitOfWork;
        }

        public async Task<AuthResponse> Handle(RegisterCommand request, CancellationToken cancellationToken)
        {
            var normalizedEmail = request.Email.Trim().ToLowerInvariant();
            var emailExists = await _userRepository.ExistsByEmailAsync(normalizedEmail, cancellationToken);
            if (emailExists)
            {
                throw new InvalidOperationException("Bu e-posta adresi ile kayıtlı bir kullanıcı zaten mevcut.");
            }

            var passwordHash = _passwordHasher.HashPassword(request.Password);
            var user = new User(
                request.FullName.Trim(),
                normalizedEmail,
                passwordHash,
                UserRole.User
            );

            var accessToken = _jwtTokenGenerator.GenerateAccessToken(user);
            var refreshToken = _jwtTokenGenerator.GenerateRefreshToken();
            var refreshTokenExpiresUtc = DateTime.UtcNow.AddDays(7);

            user.SetRefreshToken(refreshToken, refreshTokenExpiresUtc);

            await _userRepository.AddAsync(user, cancellationToken);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return new AuthResponse(
                user.Id,
                user.FullName,
                user.Email,
                user.Role.ToString(),
                accessToken,
                refreshToken,
                refreshTokenExpiresUtc
            );
        }
    }
}
