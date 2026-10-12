using System;
using System.Security.Claims;
using FlexSpace.Application.Common.Interfaces;
using Microsoft.AspNetCore.Http;

namespace FlexSpace.WebApi.Services
{
    public class CurrentUserService : ICurrentUserService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CurrentUserService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public Guid? UserId
        {
            get
            {
                var idClaim = _httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.NameIdentifier)
                              ?? _httpContextAccessor.HttpContext?.User?.FindFirstValue("sub");

                return Guid.TryParse(idClaim, out var id) ? id : null;
            }
        }

        public string? Email =>
            _httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.Email)
            ?? _httpContextAccessor.HttpContext?.User?.FindFirstValue("email");

        public string? Role =>
            _httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.Role)
            ?? _httpContextAccessor.HttpContext?.User?.FindFirstValue("role");

        public bool IsAuthenticated =>
            _httpContextAccessor.HttpContext?.User?.Identity?.IsAuthenticated ?? false;
    }
}
