using Domain.Util;


namespace APIService.Utils
{
    public static class SessionHandler
    {
        private static List<UserSession> SessionList;
        private static Random random;

        public static void Initialize()
        {
            SessionList = new List<UserSession>();
            random = new Random();
        }

        private static string HashGenerator(int length = 16)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            return new string(Enumerable.Repeat(chars, length)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }

        public static string SetUser(int? userId, string? userName)
        {
            string hash = HashGenerator();

            UserSession user = new UserSession
            {
                userId = userId,
                userName = userName,
                key = hash
            };

            // is user exist in session list
            if (SessionList.Exists(user => user.userId == userId))
            {
                int index = SessionList.FindIndex(user => user.userId == userId);
                SessionList.RemoveAt(index);
            }

            SessionList.Add(user);
            return hash;
        }

        public static void RemoveUser(int userId)
        {
            int index = SessionList.FindIndex(user => user.userId == userId);
            if (index >= 0) SessionList.RemoveAt(index);
        }

        public static void RemoveUser(string userName)
        {
            int index = SessionList.FindIndex(user => user.userName == userName);
            if (index >= 0) SessionList.RemoveAt(index);
        }

        public static bool IsSameKey(int userId, string key)
        {
            if (SessionList.Exists(user => user.userId == userId))
            {
                UserSession currentUser = SessionList.Find(user => user.userId == userId);
                if (currentUser.key == key) return true;
            }

            return false;
        }

        // Test
        public static List<UserSession> GetList()
        {
            return SessionList;
        }

        public static void Clear()
        {
            SessionList.Clear();
        }
    }
}
