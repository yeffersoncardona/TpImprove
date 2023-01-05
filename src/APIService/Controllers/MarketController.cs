using Business.Services;
using Domain.DTOs;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;


namespace APIService.API.Controllers
{
    // [Authorize]
    [Route("api/[controller]")]
    [ApiController]

    public class MarketController : Controller
    {
        private MarketBLL MarketBll = new();
        /// <summary>
        /// Get all Markets
        /// </summary>
        /// <returns>List with Markets</returns>
        [HttpGet("GetMarkets")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<Market>))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetMarkets()=>  Ok(MarketBll.GetMarkets());
        
        /// <summary>
        /// Get all Clients
        /// </summary>
        /// <returns>List with Clients</returns>
        [HttpGet("GetClients/{MarketName}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<ClientCampainDTO>))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetClients(string MarketName)=> Ok(MarketBll.GetClients(MarketName));
        /// <summary>
        /// Get all LOBs
        /// </summary>
        /// <returns>List with LOBs</returns>
        [HttpGet("GetLOBs/{IdClient}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<LOBDTO>))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetLOB(int IdClient)=> Ok(MarketBll.GetLOB(IdClient));
    }
}
