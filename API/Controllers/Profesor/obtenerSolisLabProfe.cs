using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;

[Route("api/[controller]")]
[ApiController]
public class ObtSolisLabsProfeController : Controller
{
    private readonly string connectionString = "Server=DYLAN;Database=OperaCE;Integrated Security=True;";

    [HttpGet("{cedula}")]
    public IActionResult ObtSolisLabsProfe(int cedula)
    {
        try
        {
            if (cedula <= 0)
            {
                return BadRequest("La cédula del profesor está incompleta.");
            }

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                using (SqlCommand command = new SqlCommand("obt_solis_labs_profe", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@cedula", cedula);

                    connection.Open();

                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.HasRows)
                        {
                            var solicitudes = new List<SolicitudLabProfeResponse>();

                            while (reader.Read())
                            {
                                solicitudes.Add(new SolicitudLabProfeResponse
                                {
                                    LabNombre = reader.GetString(0),
                                    Fecha = reader.GetDateTime(1),
                                    Hora = reader.GetTimeSpan(2),
                                    CantHoras = reader.GetDecimal(3)
                                });
                            }

                            return Ok(solicitudes);
                        }
                        else
                        {
                            return NotFound("No se encontraron solicitudes de reserva de laboratorio para el profesor.");
                        }
                    }
                }
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error al obtener las solicitudes de reserva de laboratorio para el profesor: {ex.Message}");
        }
    }
}

public class SolicitudLabProfeResponse
{
    public string LabNombre { get; set; }
    public DateTime Fecha { get; set; }
    public TimeSpan Hora { get; set; }
    public decimal CantHoras { get; set; }
}