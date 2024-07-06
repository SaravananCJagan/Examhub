namespace DTOs
{
    public abstract class BaseDTO
    {
        public long? Id { get; set; }
        public string Name { get; set; }
        public DateTime? LastModified { get; set; }
    }
}
