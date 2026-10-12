using System;

namespace FlexSpace.Application.Features.Auth
{
    public record AuthResponse(
        Guid UserId,
        string FullName,
        string Email,
        string Role,
        string AccessToken,
        string RefreshToken,
        DateTime RefreshTokenExpiresUtc
    );
}
