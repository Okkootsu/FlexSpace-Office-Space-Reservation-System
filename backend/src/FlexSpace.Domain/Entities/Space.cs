using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlexSpace.Domain.Common;
using FlexSpace.Domain.Enums;
using FlexSpace.Domain.ValueObjects;

namespace FlexSpace.Domain.Entities
{
    public class Space : AggregateRoot
    {
        public Guid HostId { get; private set; }
        public string Title { get; private set; } = null!;
        public string Description { get; private set; } = null!;
        public SpaceType Type { get; private set; }
        public int Capacity { get; private set; }
        public Money HourlyPrice { get; private set; } = null!;
        public Address Address { get; private set; } = null!;
        public bool IsActive { get; private set; }

        private readonly List<string> _amenities = new();
        public IReadOnlyCollection<string> Amenities => _amenities.AsReadOnly();

        private Space() { }

        public Space(Guid hostId, string title, string description, SpaceType type, 
                 int capacity, Money hourlyPrice, Address address, List<string>? amenities = null)
        {
            HostId = hostId;
            Title = title;
            Description = description;
            Type = type;
            Capacity = capacity;
            HourlyPrice = hourlyPrice;
            Address = address;
            IsActive = true;

            if (amenities != null)
                _amenities.AddRange(amenities);
        }

        public void UpdateDetails(string title, string description, int capacity, Money hourlyPrice)
        {
            Title = title;
            Description = description;
            Capacity = capacity;
            HourlyPrice = hourlyPrice;
            UpdatedAtUtc = DateTime.UtcNow;
        }

        public void Deactivate()
        {
            IsActive = false;
            UpdatedAtUtc = DateTime.UtcNow;
        }
    }
}