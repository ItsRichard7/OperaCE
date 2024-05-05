using Microsoft.AspNetCore.Mvc;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Text.Json;

namespace API.Controllers.Movil
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActualizarUsuariosController : ControllerBase
    {
        private readonly string connectionString = "Server=ALE_XPS;Database=OperaCE;Integrated Security=True;";

        [HttpPost]
        public IActionResult ActualizarUsuarios([FromBody] List<Usuario> usuarios)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    using (SqlCommand command = new SqlCommand("actualizar_usuarios", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        // Convert the list of usuarios to a single JSON string
                        string json = JsonSerializer.Serialize(usuarios);

                        // Add the JSON string as a parameter to the stored procedure
                        command.Parameters.AddWithValue("@json", json);

                        connection.Open();
                        command.ExecuteNonQuery();
                        connection.Close();
                    }
                }

                return Ok("Usuarios actualizados correctamente");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al actualizar usuarios: {ex.Message}");
            }
        }
        public class Usuario
        {
            public decimal cedula { get; set; }
            public string correo { get; set; }
            public string contrasena { get; set; }
            public decimal carnet { get; set; }
            public string p_nombre { get; set; }
            public string s_nombre { get; set; }
            public string p_apellido { get; set; }
            public string s_apellido { get; set; }
            public DateTime f_nacim { get; set; }
            public bool activo { get; set; }
            public decimal rol_id { get; set; }
        }
    }
}