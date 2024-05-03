using Microsoft.AspNetCore.Mvc;
using System.Data;
using API.Recursos;
using System.Data.SqlClient;

namespace API.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class obtenerActivo : Controller
    {
        private readonly string connectionString = "Server=ALE_XPS;Database=OperaCE;Integrated Security=True;";

        [HttpGet("activos")]
        public IActionResult obtActivos()
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    using (SqlCommand command = new SqlCommand("obt_tabla_activo", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        connection.Open();

                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            List<Activo> activos = new List<Activo>();

                            while (reader.Read())
                            {
                                Activo activo = new Activo
                                {
                                    Placa = reader.GetString(0),
                                    Tipo = reader.GetString(1),
                                    Marca = reader.GetString(2),
                                    FCompra = reader.IsDBNull(3) ? null : (DateTime?)reader.GetDateTime(3),
                                    Prestado = reader.GetBoolean(4),
                                    AprobCed = reader.GetDecimal(5)
                                };

                                activos.Add(activo);
                            }

                            return Ok(activos);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al obtener la tabla de activos: {ex.Message}");
            }
        }
    }
}