using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlexSpace.Application.Features.Bookings.Commands.CancelBooking;
using FlexSpace.Application.Features.Bookings.Commands.CreateBooking;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace FlexSpace.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookingsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public BookingsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        [ProducesResponseType(typeof(Guid), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status409Conflict)]
        public async Task<IActionResult> Create([FromBody] CreateBookingCommand command, CancellationToken cancellationToken)
        {
            var bookingId = await _mediator.Send(command, cancellationToken);

            return CreatedAtAction(nameof(Create), new { id = bookingId }, bookingId);
        }

        [HttpDelete("{id:guid}/cancel")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status409Conflict)]
        [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Cancel([FromRoute] Guid id, [FromQuery] Guid guestId, CancellationToken cancellationToken)
        {
            var command = new CancelBookingCommand(id, guestId);
            await _mediator.Send(command, cancellationToken);
            
            return NoContent();
        }
    }
}