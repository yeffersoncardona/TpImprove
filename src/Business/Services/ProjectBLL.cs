
using Business.Repositories;
using Domain.DTOs;
using Domain.Entities;
using Domain.Util;
using System.Security.AccessControl;

namespace Business.Services
{
    public sealed class ProjectBLL
    {
        public List<Project> GetAll()
        {
            try
            {

                using (var repo = new GenericDal())
                {
                    return repo.GetAll<Project>();

                }
            }
            catch { return null; }
        }
        public async Task<List<Project>> GetAvaiables()
        {
            using (var repo = new GenericDal())
            {
                return await repo.GetListAsync<Project>(new { IsActive = true });
            }
        }
        public async Task<Project> Create(ProjectDTO project)
        {
            if (project.IdLob <= 0 || project.IdUser <= 0 || project.ProjectName == null || project.MarketName == null || project.IdClient <= 0)
                return null;

            if (project.Description == null)
            {
                project.Description = string.Empty;
            }
            Client client = new Client();

            client.Id = project.IdClient;

            Client resclient = null;
            using (var repo = new GenericDal())
            {
                resclient = repo.GetByid<Client>(project.IdClient);
                Output responseclient;
                if (resclient == null)
                {
                    client.Market = project.MarketName;
                    client.Name = project.ClientName;
                    responseclient = await repo.Post<Output>(client);
                    if (responseclient.Code == 1)
                    {
                        return null;
                    }
                }
                LOB lob = new LOB();
                lob.Name = project.Lob;
                lob.IdLOB = project.IdLob;
                lob.IDClient = project.IdClient;
                var reslob = repo.GetByid<LOB>(lob.IdLOB);
                Output responselob;
                if (reslob == null)
                {
                    responselob = await repo.Post<Output>(lob);
                    if (responselob.Code == 1)
                    {
                        return null;
                    }
                }

                Project ObjProjec = new Project(project);

                return await repo.Post<Project>(ObjProjec);

            }


        }

        public Output Update(Project project)
        {
            if (project.IdProject <= 0 || project.IdProjectState <= 0 || project.IdLob <= 0 || project.ProjectName == null) return new Output { Code = 1, Message = "Parameters are not defined" };
            using (var repo = new GenericDal())
                return repo.Update<Output>(project);
        }
        public Project GetById(int id)
        {
            try
            {
                using (var repo = new GenericDal())
                    return repo.Search<Project>(new { Id = id, IsActive = true });
            }
            catch { return null; }
        }
        public Output Delete(int id)
        {
            try
            {
                using (var repo = new GenericDal())
                    return repo.Update<Output>(new { Id = id }, "spDelete_Project");
            }
            catch { return null; }
        }

        public List<Project> GetProjectsByLOB(int idLOB)
        {
            try
            {
                using (var repo = new GenericDal())
                return repo.Getlist<Project>(new { Id = idLOB, IsActive = true }, "spSelect_ProjectsByLob");
            }
            catch { return null; }
        }

    }
}
