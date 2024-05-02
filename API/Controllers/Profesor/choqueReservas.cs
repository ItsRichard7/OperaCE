using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;

[Route("api/[controller]")]
[ApiController]
public class HayChoqueReservasController : Controller
{
    private readonly string connectionString = "Server=DYLAN;Database=OperaCE;Integrated Security=True;";

    [HttpPost]
    public IActionResult HayChoqueReservas([FromBody] ReservaRequest request)
    {
        try
        {
            if (request == null || string.IsNullOrEmpty(request.LabNombre) || request.HoraInicio == null || request.CantHoras == 0)
            {
                return BadRequest("La solicitud de reserva está incompleta.");
            }

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                using (SqlCommand command = new SqlCommand("hay_choque_reservas", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@lab_nombre", request.LabNombre);
                    command.Parameters.AddWithValue("@hora_inicio", request.HoraInicio);
                    command.Parameters.AddWithValue("@cant_horas", request.CantHoras);

                    SqlParameter existeRegistroParam = new SqlParameter("@existe_registro", SqlDbType.Bit);
                    existeRegistroParam.Direction = ParameterDirection.Output;
                    command.Parameters.Add(existeRegistroParam);

                    connection.Open();

                    command.ExecuteNonQuery();

                    bool existeRegistro = (bool)existeRegistroParam.Value;

                    if (existeRegistro)
                    {
                        return Conflict(false);
                    }
                    else
                    {
                        return Ok(true);
                    }
                }
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error al verificar el choque de reservas: {ex.Message}");
        }
    }
}

public class ReservaRequest
{
    public string LabNombre { get; set; }
    public TimeSpan HoraInicio { get; set; }
    public decimal CantHoras { get; set; }
}