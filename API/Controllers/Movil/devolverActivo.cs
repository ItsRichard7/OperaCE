using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using Newtonsoft.Json.Linq;

namespace API.Controllers.Operador
{
    [Route("api/[controller]")]
    [ApiController]
    public class devolActivo : Controller
    {
        private readonly string connectionString = "Server=ALE_XPS;Database=OperaCE;Integrated Security=True;";

        [HttpPost("devolverActivo")]
        public IActionResult DevolverActivo([FromBody] JObject input)
        {
            try
            {
                string act_placa = input["act_placa"].ToString();
                DateTime fecha_dev = DateTime.Parse(input["fecha_dev"].ToString());
                TimeSpan hora_dev = TimeSpan.Parse(input["hora_dev"].ToString());
                string averia = input["averia"].ToString();

                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    using (SqlCommand command = new SqlCommand("devolver_activo", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        command.Parameters.AddWithValue("@act_placa", act_placa);
                        command.Parameters.AddWithValue("@fecha_dev", fecha_dev);
                        command.Parameters.AddWithValue("@hora_dev", hora_dev);
                        command.Parameters.AddWithValue("@averia", averia);

                        connection.Open();

                        command.ExecuteNonQuery();

                        return Ok("Activo devuelto correctamente.");
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al devolver el activo: {ex.Message}");
            }
        }
    }
}