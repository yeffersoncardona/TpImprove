using Business.Services;
using Domain.DTOs;
using Domain.Entities;
using Domain.Util;
using Microsoft.AspNetCore.Mvc;

namespace APIService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SourceProblemController : ControllerBase
    {
        private SourceProblemBLL sourceproblemBll = new ();
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<SourceProblem>))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult GetAll()
        {
            return Ok(sourceproblemBll.GetAll());
        }
        [HttpGet("list")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<SourceProblem>))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult GetList()
        {
            return Ok(sourceproblemBll.GetAvaiables());
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SourceProblem))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult GetById(int id)
        {
            return Ok(sourceproblemBll.GetById(id));
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SourceProblem))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Create([FromBody] SourceProblemDTO sourproblem)=> Ok(await sourceproblemBll.Create(sourproblem));

        [HttpPut]
        public IActionResult Update([FromBody] SourceProblemDTO sourproblem)
        {
            //project.IdUser = int.Parse(User.FindFirst("userId").Value);
            Output response = sourceproblemBll.Update(sourproblem);
            if (response.Code == 0) return Ok(response);

            return BadRequest(response);
        }
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Output))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult Delete(int id)
        {
            Output output = sourceproblemBll.Delete(id);
            if (output.Code == 0)
            {
                return Ok(output);
            }

            return BadRequest(output);
        }

    }
}
