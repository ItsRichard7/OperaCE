using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;

[Route("api/[controller]")]
[ApiController]
public class ActivosNoAprobadosController : Controller
{
    private readonly string connectionString = "Server=DYLAN;Database=OperaCE;Integrated Security=True;";

    [HttpGet("{cedula}")]
    public IActionResult ObtenerActivosNoAprobados(decimal cedula)
    {
        try
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                using (SqlCommand command = new SqlCommand("obt_activos_no_aprobados", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@cedula", cedula);

                    connection.Open();

                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.HasRows)
                        {
                            var activos = new List<ActivoNoAprobadoViewModel>();

                            while (reader.Read())
                            {
                                activos.Add(new ActivoNoAprobadoViewModel
                                {
                                    Placa = reader.GetString(0),
                                    PNombre = reader.GetString(1),
                                    SNombre = reader.GetString(2),
                                    PApellido = reader.GetString(3),
                                    SApellido = reader.GetString(4),
                                    FechaSolicitud = reader.GetDateTime(5),
                                    HoraSolicitud = reader.GetTimeSpan(6),
                                    CorreoSolicitud = reader.GetString(7),
                                });
                            }

                            return Ok(activos);
                        }
                        else
                        {
                            return NotFound("No se encontraron activos no aprobados para la cédula especificada.");
                        }
                    }
                }
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error al obtener los activos no aprobados: {ex.Message}");
        }
    }
}