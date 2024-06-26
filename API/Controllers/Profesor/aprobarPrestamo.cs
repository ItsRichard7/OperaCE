﻿using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;

[Route("api/[controller]")]
[ApiController]
public class AprobarPrestamoController : Controller
{
    private readonly string connectionString = "Server=DYLAN;Database=OperaCE;Integrated Security=True;";

    [HttpPut]
    public IActionResult AprobarPrestamo([FromBody] PrestamoRequest request)
    {
        try
        {
            if (request == null || string.IsNullOrEmpty(request.CorreoSoli) || request.FechaSoli == null || request.HoraSoli == null)
            {
                return BadRequest("La solicitud de préstamo está incompleta.");
            }

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                using (SqlCommand command = new SqlCommand("aprobar_prestamo_activo", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@correo_soli", request.CorreoSoli);
                    command.Parameters.AddWithValue("@fecha_soli", request.FechaSoli);
                    command.Parameters.AddWithValue("@hora_soli", request.HoraSoli);

                    connection.Open();

                    int rowsAffected = command.ExecuteNonQuery();

                    if (rowsAffected > 0)
                    {
                        return Ok("Prestamo aprobado correctamente.");
                    }
                    else
                    {
                        return NotFound("No se encontró el préstamo con el correo, fecha y hora especificados.");
                    }
                }
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error al aprobar el préstamo: {ex.Message}");
        }
    }
}