﻿using Microsoft.Extensions.Logging;
using Models;
using Models.Entities;
using Models.Mappers;
using Repository.Interfaces;
using Service.Interfaces;

namespace Service.Implementation
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly ILogger<UserService> _logger;

        public UserService(IUserRepository userRepository, ILogger<UserService> logger)
        {
            _userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));

        }
        public async Task<UserDto> AddAsync(UserDto userDto)
        {
            // Verificar se o email já está registrado
            User existingUser = await _userRepository.GetByEmail(userDto.Email);
            if (existingUser.Email != null)
            {
                throw new InvalidOperationException("Email já está em uso.");
            }

            try
            {
                var entity = UserMapper.ToEntityAdd(userDto);
                entity.Password = HashPassword(userDto.Password);
                var entitySaved = await _userRepository.AddAsync(entity);
                await _userRepository.SaveAsync();

                return UserMapper.ToDto(entitySaved);

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ocorreu um erro ao registrar novo usuário");
                throw;
            }
        }
        public async Task<bool> Login(string email, string password)
        {
            try
            {
                User user = await _userRepository.GetByEmail(email);
                if (user.Email == null)
                {
                    return false; // Usuário não encontrado
                }

                // Verificar se a senha está correta
                return VerifyPassword(password, user.Password);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ocorreu um erro ao validar dados do usuário");
                throw;
            }

        }
        public async Task<UserDto> Update(UserDto userDto)
        {
            try
            {
                // Buscar o usuário pelo ID
                User entity = await _userRepository.GetByIdAsync(userDto.Id);
                if (entity == null)
                {
                    throw new InvalidOperationException("Usuário não encontrado.");
                }
                // Atualizar as informações pessoais
                entity = UserMapper.ToEntityUpdate(userDto, entity);
                //entity.Password = HashPassword(userDto.Password);

                // Salvar as alterações no repositório
                var entityUpdate = await _userRepository.Update(entity);
                await _userRepository.SaveAsync();
                return UserMapper.ToDto(entityUpdate);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ocorreu um erro ao atualizar dados do usuário");
                throw;
            }
        }
        private string HashPassword(string password)
        {
            // Verifica se a senha não é nula ou vazia
            if (string.IsNullOrWhiteSpace(password))
            {
                throw new ArgumentException("A senha não pode ser nula ou vazia.", nameof(password));
            }

            try
            {
                // Gera o hash da senha usando BCrypt
                return BCrypt.Net.BCrypt.HashPassword(password);
            }
            catch (Exception ex)
            {
                // Lidar com exceções inesperadas
                throw new InvalidOperationException("Erro ao gerar hash da senha.", ex);
            }
        }
        private bool VerifyPassword(string password, string storedHash)
        {
            // Verifica se a senha não é nula ou vazia
            if (string.IsNullOrWhiteSpace(password))
            {
                throw new ArgumentException("A senha não pode ser nula ou vazia.", nameof(password));
            }

            if (string.IsNullOrWhiteSpace(storedHash))
            {
                throw new ArgumentException("O hash da senha armazenado não pode ser nulo ou vazio.", nameof(storedHash));
            }

            try
            {
                // Verifica se a senha fornecida corresponde ao hash armazenado
                return BCrypt.Net.BCrypt.Verify(password, storedHash);
            }
            catch (Exception ex)
            {
                // Lidar com exceções inesperadas
                throw new InvalidOperationException("Erro ao verificar a senha.", ex);
            }
        }
        public async Task<UserDto> GetById(int userId)
        {
            try
            {
                var entity = await _userRepository.GetByIdAsync(userId);
                return UserMapper.ToDto(entity);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Usuário não encontrado.");
                throw;
            }
        }
        public async Task<UserDto> GetUserByEmail(string email)
        {
            try
            {
                var entity = await _userRepository.GetByEmail(email);
                return UserMapper.ToDto(entity);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Usuário não encontrado.");
                throw;
            }
        }
        public async Task<IEnumerable<UserDto>> GetAll()
        {
            try
            {
                var entity = await _userRepository.GetAllAsync();
                return UserMapper.ToDtos(entity);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Lista de usuário não encontrada.");
                throw;
            }
        }

        //Admin methods
        public async Task LockUser(int userId)
        {
            _userRepository.LockUserAsync(userId);
        }
        public async Task UnlockUser(int userId)
        {
            _userRepository.UnlockUserAsync(userId);
        }
        public void ManageUserAccess(int userId, string action)
        {
            // Logic to lock or unlock user accounts
            if (action == "lock")
                LockUser(userId);
            else
                UnlockUser(userId);
        }
    }
}
