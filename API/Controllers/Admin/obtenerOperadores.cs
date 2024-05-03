using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using API.Models;
using Microsoft.AspNetCore.Mvc.ApplicationModels;

namespace API.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class MostrarOperadoresController : Controller
    {
        private readonly string connectionString = "Server=ALE_XPS;Database=OperaCE;Integrated Security=True;";

        [HttpGet()]
        public IActionResult ObtenerOperadores()
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    using (SqlCommand command = new SqlCommand("mostrar_operadores", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        connection.Open();

                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            List<OperadorAdmin> operadores = new List<OperadorAdmin>();

                            while (reader.Read())
                            {
                                OperadorAdmin operador = new OperadorAdmin
                                {
                                    Carnet = reader.GetDecimal(0),
                                    PNombre = reader.GetString(1),
                                    SNombre = reader.GetString(2),
                                    PApellido = reader.GetString(3),
                                    SApellido = reader.GetString(4),
                                    HorasTotales = reader.GetDecimal(5)
                                };

                                operadores.Add(operador);
                            }

                            return Ok(operadores);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al obtener los operadores: {ex.Message}");
            }
        }
    }
}