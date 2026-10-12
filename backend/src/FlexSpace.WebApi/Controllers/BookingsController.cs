using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlexSpace.Application.Features.Bookings.Commands.CancelBooking;
using FlexSpace.Application.Features.Bookings.Commands.CreateBooking;
using FlexSpace.Application.Features.Bookings.Queries.GetUserBookings;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FlexSpace.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class BookingsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public BookingsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("my-bookings")]
        [ProducesResponseType(typeof(IReadOnlyList<BookingDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> GetMyBookings(CancellationToken cancellationToken)
        {
            var query = new GetUserBookingsQuery();
            var bookings = await _mediator.Send(query, cancellationToken);
            
            return Ok(bookings);
        }

        [HttpPost]
        [ProducesResponseType(typeof(Guid), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> Create([FromBody] CreateBookingCommand command, CancellationToken cancellationToken)
        {
            var bookingId = await _mediator.Send(command, cancellationToken);

            return CreatedAtAction(nameof(Create), new { id = bookingId }, bookingId);
        }

        [HttpDelete("{id:guid}/cancel")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status409Conflict)]
        [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> Cancel([FromRoute] Guid id, CancellationToken cancellationToken)
        {
            var command = new CancelBookingCommand(id);
            await _mediator.Send(command, cancellationToken);
            
            return NoContent();
        }
    }
}