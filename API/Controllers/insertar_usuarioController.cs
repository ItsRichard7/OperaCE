using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("insertar_usuario")]

    public class insertar_usuarioController : ControllerBase
    {
        public dynamic insertar_usuario()
        {
            return "insertar_usuario";
        }
    }
}
