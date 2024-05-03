using API.Recursos;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;

namespace API.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class obtenerActAdmin : Controller
    {
        private readonly string connectionString = "Server=ALE_XPS;Database=OperaCE;Integrated Security=True;";

        [HttpGet]

        public IActionResult ObtenerActivos()
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    using (SqlCommand command = new SqlCommand("obt_activos", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        connection.Open();

                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            List<ActivoAdmin> activos = new List<ActivoAdmin>();

                            while (reader.Read())
                            {
                                ActivoAdmin activo = new ActivoAdmin
                                {
                                    Placa = reader["placa"].ToString(),
                                    Tipo = reader["tipo"].ToString(),
                                    Marca = reader["marca"].ToString(),
                                    FCompra = Convert.ToDateTime(reader["f_compra"])
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
                return StatusCode(500, $"Error al obtener laboratorios: {ex.Message}");
            }
        }
    }
}