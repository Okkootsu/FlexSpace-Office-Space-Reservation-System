using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlexSpace.Application.Common.Interfaces;
using FlexSpace.Infrastructure.Persistence;
using FlexSpace.Infrastructure.Persistence.Repositories;
using FlexSpace.Infrastructure.Persistence.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace FlexSpace.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("DefaultConnection");

            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseNpgsql(connectionString));

            // Sözleşmelerin somut sınıflarla eşleştirilmesi
            services.AddScoped<IUnitOfWork>(sp => sp.GetRequiredService<ApplicationDbContext>());
            services.AddScoped<ISpaceRepository, SpaceRepository>();
            services.AddScoped<ISpaceQueryService, SpaceQueryService>();
            services.AddScoped<IBookingRepository, BookingRepository>();
            services.AddScoped<IBookingQueryService, BookingQueryService>();

            return services;
        }
    }
}