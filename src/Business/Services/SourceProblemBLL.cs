using Business.Repositories;
using Domain.DTOs;
using Domain.Entities;
using Domain.Util;

namespace Business.Services
{
    public class SourceProblemBLL 
    {

        public Output Delete(int id)
        {
            try
            {
                using (var repo = new GenericDal())
                    return repo.Update<Output>(new { Id = id }, "spDelete_SourceProblem");
            }
            catch (Exception ex) { return new Output {Code=1, Message= ex.Message }; }
        }
        public SourceProblemEntity GetById(int id)
        {
            try
            {
                using (var repo = new GenericDal())
                    return repo.GetByid<SourceProblemEntity>(id);
            }
            catch { return null; }
        }

        public List<SourceProblemEntity> GetAll()
        {
            try {
                using (var repo = new GenericDal())
                    return repo.GetAll<SourceProblemEntity>(); 
            }
            catch { return null; }
        }
        public async Task<List<SourceProblemEntity>> GetAvaiables()
        {
            using (var repo = new GenericDal())
            return await repo.GetListAsync<SourceProblemEntity>(new { IsActive = true });
        }
        public async Task<Output> Create(SourceProblemDTO sourceproblemdto)
        {
            try
            {
                SourceProblem objsourceproblem = new SourceProblem(sourceproblemdto);
                if (sourceproblemdto.IdProject <= 0 || sourceproblemdto.IDSproblem < 0 || sourceproblemdto.IsActive == null)
                    return new Output { Code = 1, Message = "Parameters are not defined" };
                using (var repo = new GenericDal())
                {
                    var output = await repo.Post<Output>(objsourceproblem);
                    int? idSourceP = output.outputinsert;
                    var outputaux = output;
                    outputaux.outputinsert = null;


                    ProblemReasonsDetail ProblemR = new ProblemReasonsDetail();

                    foreach (var item in sourceproblemdto.problemdetails)
                    {
                        ProblemR.IdSourceProblem = idSourceP;
                        ProblemR.IdFather = outputaux.outputinsert != null ? outputaux.outputinsert : null;

                        ProblemR.Why = item.Why;
                        ProblemR.IDProblemReasons = item.IDProblemReasons;
                        ProblemR.CreateDate = item.CreateDate;
                        ProblemR.IsActive = item.IsActive;
                        outputaux = await repo.Post<Output>(ProblemR);
                    }
                    return outputaux;
                }
                    
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public Output Update(SourceProblemDTO sourceproblemdto)
        {
            SourceProblem objsourceproblem = new SourceProblem(sourceproblemdto);
            if (sourceproblemdto.IdProject <= 0 || sourceproblemdto.IDSproblem <= 0 || sourceproblemdto.IsActive == null
                || sourceproblemdto.problemdetails == null)
                return new Output { Code = 1, Message = "Parameters are not defined" };
            using (var repo = new GenericDal())
            {
                var output = repo.Update<Output>(objsourceproblem);
                int? idSourceP = output.outputinsert;
                var outputaux = output;
                outputaux.outputinsert = null;


                ProblemReasonsDetail ProblemR = new ProblemReasonsDetail();

                foreach (var item in sourceproblemdto.problemdetails)
                {
                    ProblemR.IdSourceProblem = idSourceP;
                    ProblemR.IdFather = outputaux.outputinsert != null ? outputaux.outputinsert : null;

                    ProblemR.Why = item.Why;
                    ProblemR.IDProblemReasons = item.IDProblemReasons;
                    ProblemR.CreateDate = item.CreateDate;
                    ProblemR.IsActive = item.IsActive;
                    outputaux = repo.Update<Output>(ProblemR);
                }
                return outputaux;
            }


        }
    }
}
