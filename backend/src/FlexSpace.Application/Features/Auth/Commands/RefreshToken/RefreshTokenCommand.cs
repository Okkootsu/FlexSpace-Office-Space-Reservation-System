using MediatR;

namespace FlexSpace.Application.Features.Auth.Commands.RefreshToken
{
    public record RefreshTokenCommand(
        string RefreshToken
    ) : IRequest<AuthResponse>;
}
