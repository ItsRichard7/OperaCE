using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using API.Recursos;
using Microsoft.AspNetCore.Mvc.ApplicationModels;

namespace API.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class editarProfesorController : Controller
    {
        private readonly string connectionString = "Server=ALE_XPS;Database=OperaCE;Integrated Security=True;";

        [HttpPut()]
        public IActionResult ActualizarProfesor([FromBody] Profesor profesor)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    using (SqlCommand command = new SqlCommand("editar_profesor", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        command.Parameters.AddWithValue("@cedula", profesor.Cedula);
                        command.Parameters.AddWithValue("@correo", profesor.Correo);
                        command.Parameters.AddWithValue("@p_nombre", profesor.PNombre);
                        command.Parameters.AddWithValue("@s_nombre", profesor.SNombre);
                        command.Parameters.AddWithValue("@p_apellido", profesor.PApellido);
                        command.Parameters.AddWithValue("@s_apellido", profesor.SApellido);
                        command.Parameters.AddWithValue("@f_nacim", profesor.FNacimiento);

                        connection.Open();

                        int rowsAffected = command.ExecuteNonQuery();

                        if (rowsAffected > 0)
                        {
                            return Ok(true);
                        }
                        else
                        {
                            return NotFound("No se encontró el profesor con la cédula especificada.");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al actualizar el profesor: {ex.Message}");
            }
        }
    }
}