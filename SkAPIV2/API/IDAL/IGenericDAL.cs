namespace IDAL
{
    public interface IGenericDAL<T> where T : class
    {
        Task<T> Get(long id);
        Task<IReadOnlyList<T>> GetAll();
        Task<T> Add(T entity);
        Task<bool> Exists(long id);
        Task Update(T entity);
        Task Delete(T entity);
    }
}