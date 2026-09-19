using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using FlexSpace.Application.Common.Interfaces;
using FlexSpace.Domain.Common;
using FlexSpace.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FlexSpace.Infrastructure.Persistence
{
    public class ApplicationDbContext : DbContext, IUnitOfWork
    {
        private readonly IPublisher _publisher;

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options, IPublisher publisher)
            : base(options)
        {
            _publisher = publisher;
        }

        public DbSet<Space> Spaces => Set<Space>();
        public DbSet<Booking> Bookings => Set<Booking>();
        public DbSet<User> Users => Set<User>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Bu assembly içindeki tüm IEntityTypeConfiguration sınıflarını otomatik uygula
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
            base.OnModelCreating(modelBuilder);
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            // 1. Değişiklikleri veritabanına kaydet
            var result = await base.SaveChangesAsync(cancellationToken);

            // 2. Aggregate'ler üzerindeki Domain Event'leri topla ve MediatR ile yayınla
            await DispatchDomainEventsAsync(cancellationToken);

            return result;
        }

        private async Task DispatchDomainEventsAsync(CancellationToken cancellationToken)
        {
            var domainEntities = ChangeTracker
                .Entries<AggregateRoot>()
                .Where(x => x.Entity.DomainEvents.Any())
                .Select(x => x.Entity)
                .ToList();

            var domainEvents = domainEntities
                .SelectMany(x => x.DomainEvents)
                .ToList();

            domainEntities.ForEach(entity => entity.ClearDomainEvents());

            foreach (var domainEvent in domainEvents)
            {
                await _publisher.Publish(domainEvent, cancellationToken);
            }
        }
    }
}