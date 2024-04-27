﻿using Microsoft.AspNetCore.Mvc;
using System;
using System.Data;
using System.Data.SqlClient;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly string connectionString = "Server= DYLAN; Database= OperaCE; Integrated Security=True;"; // Reemplaza con tu cadena de conexión

        [HttpPost]
        public IActionResult InsertarUsuario([FromBody] UsuarioModel usuario)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    using (SqlCommand command = new SqlCommand("insertar_usuario", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        command.Parameters.AddWithValue("@cedula", usuario.Cedula);
                        command.Parameters.AddWithValue("@correo", usuario.Correo);
                        command.Parameters.AddWithValue("@contrasena", usuario.Contrasena);
                        command.Parameters.AddWithValue("@carnet", usuario.Carnet);
                        command.Parameters.AddWithValue("@p_nombre", usuario.PrimerNombre);
                        command.Parameters.AddWithValue("@s_nombre", (object)usuario.SegundoNombre ?? DBNull.Value); // Manejar explícitamente el valor nulo
                        command.Parameters.AddWithValue("@p_apellido", usuario.PrimerApellido);
                        command.Parameters.AddWithValue("@s_apellido", (object)usuario.SegundoApellido ?? DBNull.Value); // Manejar explícitamente el valor nulo
                        command.Parameters.AddWithValue("@f_nacim", usuario.FechaNacimiento);


                        connection.Open();
                        command.ExecuteNonQuery();
                        connection.Close();
                    }
                }

                return Ok("Usuario insertado correctamente.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al insertar usuario: {ex.Message}");
            }
        }
    }

    public class UsuarioModel
    {
        public decimal Cedula { get; set; }
        public string Correo { get; set; }
        public string Contrasena { get; set; }
        public decimal Carnet { get; set; }
        public string PrimerNombre { get; set; }
        public string? SegundoNombre { get; set; }
        public string PrimerApellido { get; set; }
        public string? SegundoApellido { get; set; }
        public DateTime FechaNacimiento { get; set; }
    }
}