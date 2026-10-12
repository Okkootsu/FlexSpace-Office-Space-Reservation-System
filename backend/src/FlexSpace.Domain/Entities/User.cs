using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlexSpace.Domain.Common;
using FlexSpace.Domain.Enums;

namespace FlexSpace.Domain.Entities
{
    public class User : BaseEntity
    {
        public string FullName { get; private set; } = null!;
        public string Email { get; private set; } = null!;
        public string PasswordHash { get; private set; } = null!;
        public UserRole Role { get; private set; }
        public string? RefreshToken { get; private set; }
        public DateTime? RefreshTokenExpiresUtc { get; private set; }

        private User() { }

        public User(string fullName, string email, string passwordHash, UserRole role = UserRole.User)
        {
            FullName = fullName;
            Email = email;
            PasswordHash = passwordHash;
            Role = role;
        }

        public void SetRefreshToken(string refreshToken, DateTime expiresUtc)
        {
            RefreshToken = refreshToken;
            RefreshTokenExpiresUtc = expiresUtc;
            UpdatedAtUtc = DateTime.UtcNow;
        }

        public void RevokeRefreshToken()
        {
            RefreshToken = null;
            RefreshTokenExpiresUtc = null;
            UpdatedAtUtc = DateTime.UtcNow;
        }

        public void UpdatePassword(string passwordHash)
        {
            PasswordHash = passwordHash;
            UpdatedAtUtc = DateTime.UtcNow;
        }
    }
}