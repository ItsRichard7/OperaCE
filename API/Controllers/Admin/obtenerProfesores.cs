using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using API.Recursos;
using Microsoft.AspNetCore.Mvc.ApplicationModels;

namespace API.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class obtProfesoresController : Controller
    {
        private readonly string connectionString = "Server=ALE_XPS;Database=OperaCE;Integrated Security=True;";

        [HttpGet]
        public IActionResult ObtenerProfesores()
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    using (SqlCommand command = new SqlCommand("obt_profesores", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        connection.Open();

                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            List<Profesor> profesores = new List<Profesor>();

                            while (reader.Read())
                            {
                                Profesor profesor = new Profesor
                                {
                                    Cedula = reader.GetDecimal(0),
                                    PNombre = reader.GetString(1),
                                    SNombre = reader.GetString(2),
                                    PApellido = reader.GetString(3),
                                    SApellido = reader.GetString(4),
                                    Edad = reader.GetInt32(5),
                                    FNacimiento = reader.GetDateTime(6),
                                    Correo = reader.GetString(7)
                                };

                                profesores.Add(profesor);
                            }

                            return Ok(profesores);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al obtener la lista de profesores: {ex.Message}");
            }
        }
    }
}