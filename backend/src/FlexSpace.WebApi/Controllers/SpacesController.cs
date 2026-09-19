using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlexSpace.Application.Features.Spaces.Commands;
using FlexSpace.Application.Features.Spaces.Queries.GetSpaces;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace FlexSpace.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SpacesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public SpacesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        [ProducesResponseType(typeof(Guid), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Create([FromBody] CreateSpaceCommand command, CancellationToken cancellationToken)
        {
            var spaceId = await _mediator.Send(command, cancellationToken);
            return CreatedAtAction(nameof(GetById), new { id = spaceId }, spaceId);
        }

        [HttpGet]
        [ProducesResponseType(typeof(IReadOnlyList<SpaceDto>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAll([FromQuery] GetSpacesQuery query, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(query, cancellationToken);
            return Ok(result);
        }

        [HttpGet("{id:guid}")]
        [ProducesResponseType(typeof(SpaceDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetById([FromRoute] Guid id, CancellationToken cancellationToken)
        {
            var query = new GetSpacesQuery(); 
            var spaces = await _mediator.Send(query, cancellationToken);
            var space = spaces.FirstOrDefault(s => s.Id == id);

            if (space is null)
                return NotFound();

            return Ok(space);
        }
    }
}