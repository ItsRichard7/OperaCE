using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;

[Route("api/[controller]")]
[ApiController]
public class ObtSolisLabController : Controller
{
    private readonly string connectionString = "Server=DYLAN;Database=OperaCE;Integrated Security=True;";

    [HttpGet("{nombre}")]
    public IActionResult ObtSolisLab(string nombre)
    {
        try
        {
            if (string.IsNullOrEmpty(nombre))
            {
                return BadRequest("El nombre del laboratorio está incompleto.");
            }

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                using (SqlCommand command = new SqlCommand("obt_solis_lab", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@nombre", nombre);

                    connection.Open();

                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.HasRows)
                        {
                            var solicitudes = new List<SolicitudLabResponse>();

                            while (reader.Read())
                            {
                                solicitudes.Add(new SolicitudLabResponse
                                {
                                    CorreoSoli = reader.GetString(0),
                                    FechaSoli = reader.GetDateTime(1),
                                    HoraSoli = reader.GetTimeSpan(2),
                                    Carnet = reader.GetInt32(3),
                                    PNombre = reader.GetString(4),
                                    SNombre = reader.GetString(5),
                                    PApellido = reader.GetString(6),
                                    SApellido = reader.GetString(7),
                                    CantHoras = reader.GetDecimal(8),
                                    LabNombre = reader.GetString(9),
                                    UserCed = reader.GetInt32(10)
                                });
                            }

                            return Ok(solicitudes);
                        }
                        else
                        {
                            return NotFound("No se encontraron solicitudes de reserva de laboratorio.");
                        }
                    }
                }
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error al obtener las solicitudes de reserva de laboratorio: {ex.Message}");
        }
    }
}

public class SolicitudLabResponse
{
    public string CorreoSoli { get; set; }
    public DateTime FechaSoli { get; set; }
    public TimeSpan HoraSoli { get; set; }
    public int Carnet { get; set; }
    public string PNombre { get; set; }
    public string SNombre { get; set; }
    public string PApellido { get; set; }
    public string SApellido { get; set; }
    public decimal CantHoras { get; set; }
    public string LabNombre { get; set; }
    public int UserCed { get; set; }
}