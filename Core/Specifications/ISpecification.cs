using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Core.Specifications
{
    public interface ISpecification<T>
    {
         Expression<Func<T, bool>> Criteria {get; }
         List<Expression<Func<T, object>>> Include {get; }
         Expression<Func<T, Object>> OderBy {get; }
         Expression<Func<T, Object>> OrderByDescending {get; }
        int Take {get;}
        int Skip {get; }
        bool IsPagingEnable {get; }
    }
}