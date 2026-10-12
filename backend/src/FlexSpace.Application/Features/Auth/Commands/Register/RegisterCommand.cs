using MediatR;

namespace FlexSpace.Application.Features.Auth.Commands.Register
{
    public record RegisterCommand(
        string FullName,
        string Email,
        string Password
    ) : IRequest<AuthResponse>;
}
