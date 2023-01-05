using Business.Services;
using Domain.Entities;
using Domain.Util;
using Microsoft.AspNetCore.Mvc;

namespace APIService.Controllers
{
    // [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly ClientBll _clientBll;
        public ClientController(ClientBll client) => _clientBll = client;

        /// <summary>
        /// Get all clients
        /// </summary>
        /// <returns>object with clients</returns>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<Client>))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult GetAll()
        {
            return Ok(_clientBll.GetAll());
        }
        /// <summary>
        /// Get client list
        /// </summary>
        /// <returns>list clients</returns>
        [HttpGet("list")]
        public IActionResult GetList()
        {
            return Ok(_clientBll.GetAvaiables());
        }
        /// <summary>
        /// Get specifict client by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Object client</returns>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Client))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult GetById(int id)
        {
            return Ok(_clientBll.GetById(id));
        }
        /// <summary>
        /// Create a client
        /// </summary>
        /// <param name="client"></param>
        /// <returns></returns>
        /// No deberia retornar ese Output, deberia ser el mismo objeto generado
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Output))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult Create([FromBody] Client client)=> Ok(_clientBll.Create(client));
        
        /// <summary>
        /// Update Client data
        /// </summary>
        /// <param name="client"></param>
        /// <returns>Code 200</returns>
        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Output))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Update([FromBody] Client client)=> Ok(await _clientBll.Update(client));
        /// <summary>
        /// Get all clients
        /// </summary>
        /// <returns>object with clients</returns>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<Client>))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult GetClients()
        {
            return Ok(_clientBll.GetAll());
        }
       
    }
}
