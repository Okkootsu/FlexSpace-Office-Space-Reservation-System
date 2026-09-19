using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlexSpace.Application.Common.Interfaces;
using FlexSpace.Domain.Entities;
using FlexSpace.Domain.ValueObjects;
using MediatR;

namespace FlexSpace.Application.Features.Spaces.Commands.CreateSpace
{
    public class CreateSpaceCommandHandler : IRequestHandler<CreateSpaceCommand, Guid>
    {
        private readonly ISpaceRepository _spaceRepository;
        private readonly IUnitOfWork _unitOfWork;

        public CreateSpaceCommandHandler(ISpaceRepository spaceRepository, IUnitOfWork unitOfWork)
        {
            _spaceRepository = spaceRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<Guid> Handle(CreateSpaceCommand request, CancellationToken cancellationToken)
        {
            var hourlyPrice = new Money(request.HourlyPriceAmount, request.Currency);
            var address = new Address(request.City, request.District, request.Street, request.PostalCode);

            var space = new Space(
                hostId: request.HostId,
                title: request.Title,
                description: request.Description,
                type: request.Type,
                capacity: request.Capacity,
                hourlyPrice: hourlyPrice,
                address: address,
                amenities: request.Amenities
            );

            await _spaceRepository.AddAsync(space);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return space.Id;
        }
    }
}