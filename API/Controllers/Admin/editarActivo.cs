using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using API.Models;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using API.Recursos;

namespace API.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class EditarActivoController : Controller
    {
        private readonly string connectionString = "Server=DYLAN;Database=OperaCE;Integrated Security=True;";

        [HttpPut]
        public IActionResult EditarActivo([FromBody] ActivoAdmin activo)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    using (SqlCommand command = new SqlCommand("editar_activo", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        command.Parameters.AddWithValue("@placa", activo.Placa);
                        command.Parameters.AddWithValue("@tipo", activo.Tipo);
                        command.Parameters.AddWithValue("@marca", activo.Marca);
                        command.Parameters.AddWithValue("@f_compra", activo.FCompra);

                        connection.Open();

                        int rowsAffected = command.ExecuteNonQuery();

                        if (rowsAffected > 0)
                        {
                            return Ok("Activo actualizado correctamente.");
                        }
                        else
                        {
                            return NotFound("No se encontró el activo con la placa especificada.");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al actualizar el activo: {ex.Message}");
            }
        }
    }
}