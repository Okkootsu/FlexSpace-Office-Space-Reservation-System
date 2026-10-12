using MediatR;

namespace FlexSpace.Application.Features.Auth.Commands.Login
{
    public record LoginCommand(
        string Email,
        string Password
    ) : IRequest<AuthResponse>;
}
