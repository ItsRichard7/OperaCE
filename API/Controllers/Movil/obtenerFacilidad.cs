using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using API.Recursos;

namespace API.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class obtenerFacilidad : Controller
    {
        private readonly string connectionString = "Server=ALE_XPS;Database=OperaCE;Integrated Security=True;";

        [HttpGet]
        public IActionResult obtFacilidad()
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    using (SqlCommand command = new SqlCommand("obt_tabla_lab_facilidad", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        connection.Open();

                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            List<Facilidad> usuarios = new List<Facilidad>();

                            while (reader.Read())
                            {
                                Facilidad usuario = new Facilidad
                                {
                                    Lab_nombre = reader["lab_nombre"].ToString(),
                                    Descripcion = reader["descripcion"].ToString(),
                                };

                                usuarios.Add(usuario);
                            }

                            return Ok(usuarios);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al obtener la tabla de usuarios: {ex.Message}");
            }
        }
    }
}