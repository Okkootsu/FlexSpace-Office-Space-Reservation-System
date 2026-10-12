using System;
using FlexSpace.Domain.Entities;

namespace FlexSpace.Application.Common.Interfaces
{
    public interface IJwtTokenGenerator
    {
        string GenerateAccessToken(User user);
        string GenerateRefreshToken();
    }
}
