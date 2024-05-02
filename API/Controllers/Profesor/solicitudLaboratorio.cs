using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;

[Route("api/[controller]")]
[ApiController]
public class InsertarSoliLabController : Controller
{
    private readonly string connectionString = "Server=DYLAN;Database=OperaCE;Integrated Security=True;";

    [HttpPost]
    public IActionResult InsertarSoliLab([FromBody] SolicitudLabRequest request)
    {
        try
        {
            if (request == null || request.CorreoSoli == null || request.FechaSoli == null || request.HoraSoli == null ||
                request.Carnet == 0 || request.PNombre == null || request.SNombre == null || request.PApellido == null ||
                request.SApellido == null || request.CantHoras == 0 || request.LabNombre == null || request.UserCed == 0)
            {
                return BadRequest("La solicitud de reserva de laboratorio está incompleta.");
            }

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                using (SqlCommand command = new SqlCommand("insertar_soli_lab", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@correoSoli", request.CorreoSoli);
                    command.Parameters.AddWithValue("@fechaSoli", request.FechaSoli);
                    command.Parameters.AddWithValue("@horaSoli", request.HoraSoli);
                    command.Parameters.AddWithValue("@carnet", (object)request.Carnet ?? DBNull.Value); // Manejar explícitamente el valor nulo
                    command.Parameters.AddWithValue("@pNombre", request.PNombre);
                    command.Parameters.AddWithValue("@sNombre", request.SNombre);
                    command.Parameters.AddWithValue("@pApellido", request.PApellido);
                    command.Parameters.AddWithValue("@sApellido", request.SApellido);
                    command.Parameters.AddWithValue("@cantHoras", request.CantHoras);
                    command.Parameters.AddWithValue("@labNombre", request.LabNombre);
                    command.Parameters.AddWithValue("@userCed", request.UserCed);

                    connection.Open();

                    int rowsAffected = command.ExecuteNonQuery();

                    if (rowsAffected > 0)
                    {
                        return Ok("La solicitud de reserva de laboratorio ha sido insertada correctamente.");
                    }
                    else
                    {
                        return BadRequest("No se pudo insertar la solicitud de reserva de laboratorio.");
                    }
                }
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error al insertar la solicitud de reserva de laboratorio: {ex.Message}");
        }
    }
}

public class SolicitudLabRequest
{
    public string CorreoSoli { get; set; }
    public DateTime FechaSoli { get; set; }
    public TimeSpan HoraSoli { get; set; }
    public decimal? Carnet { get; set; }
    public string PNombre { get; set; }
    public string SNombre { get; set; }
    public string PApellido { get; set; }
    public string SApellido { get; set; }
    public decimal CantHoras { get; set; }
    public string LabNombre { get; set; }
    public decimal UserCed { get; set; }
}