using Microsoft.AspNetCore.Mvc;
using Models;
using Service.Interfaces;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RecipeCategoryController : ControllerBase
    {
        private readonly ILogger<RecipeCategoryController> _logger;
        private readonly IRecipeCategoryService _service;

        public RecipeCategoryController(ILogger<RecipeCategoryController> logger, IRecipeCategoryService service)
        {
            _logger = logger;
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<RecipeCategoryDto>>> GetAll()
        {
            try
            {
                var items = await _service.GetAll();
                return Ok(items);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving all RecipeCategoryDtos");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("GetById")]
        public async Task<ActionResult<RecipeCategoryDto>> GetById(int id)
        {
            try
            {
                var item = await _service.GetById(id);
                if (item == null)
                {
                    return NotFound();
                }
                return Ok(item);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving RecipeCategoryDto with ID {{Id}}", id);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost]
        public async Task<ActionResult<RecipeCategoryDto>> Create(RecipeCategoryDto item, CancellationToken cancellationToken)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var createdItem = await _service.AddAsync(item);
                return CreatedAtAction(nameof(GetById), new { id = createdItem.Id }, createdItem);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating RecipeCategoryDto");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update(int id, RecipeCategoryDto item)
        {
            try
            {
                if (id != item.Id)
                {
                    return BadRequest("ID mismatch");
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var updated = await _service.Update(item);
                if (updated == null)
                {
                    return NotFound();
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating RecipeCategoryDto with ID {{Id}}", id);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var deleted = await _service.DeleteAsync(id);
                if (!deleted)
                {
                    return NotFound();
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting RecipeCategoryDto with ID {{Id}}", id);
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
