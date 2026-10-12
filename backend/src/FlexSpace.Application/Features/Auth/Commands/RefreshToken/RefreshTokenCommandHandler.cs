using System;
using System.Threading;
using System.Threading.Tasks;
using FlexSpace.Application.Common.Interfaces;
using MediatR;

namespace FlexSpace.Application.Features.Auth.Commands.RefreshToken
{
    public class RefreshTokenCommandHandler : IRequestHandler<RefreshTokenCommand, AuthResponse>
    {
        private readonly IUserRepository _userRepository;
        private readonly IJwtTokenGenerator _jwtTokenGenerator;
        private readonly IUnitOfWork _unitOfWork;

        public RefreshTokenCommandHandler(
            IUserRepository userRepository,
            IJwtTokenGenerator jwtTokenGenerator,
            IUnitOfWork unitOfWork)
        {
            _userRepository = userRepository;
            _jwtTokenGenerator = jwtTokenGenerator;
            _unitOfWork = unitOfWork;
        }

        public async Task<AuthResponse> Handle(RefreshTokenCommand request, CancellationToken cancellationToken)
        {
            var user = await _userRepository.GetByRefreshTokenAsync(request.RefreshToken, cancellationToken);

            if (user == null || user.RefreshTokenExpiresUtc == null || user.RefreshTokenExpiresUtc <= DateTime.UtcNow)
            {
                throw new InvalidOperationException("Geçersiz veya süresi dolmuş refresh token.");
            }

            var newAccessToken = _jwtTokenGenerator.GenerateAccessToken(user);
            var newRefreshToken = _jwtTokenGenerator.GenerateRefreshToken();
            var refreshTokenExpiresUtc = DateTime.UtcNow.AddDays(7);

            user.SetRefreshToken(newRefreshToken, refreshTokenExpiresUtc);

            _userRepository.Update(user);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return new AuthResponse(
                user.Id,
                user.FullName,
                user.Email,
                user.Role.ToString(),
                newAccessToken,
                newRefreshToken,
                refreshTokenExpiresUtc
            );
        }
    }
}
