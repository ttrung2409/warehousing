using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Dependencies;
using Microsoft.Practices.Unity;

namespace Warehousing
{
    public class UnityResolver : IDependencyResolver
    {
        public UnityResolver(IUnityContainer container)
        {
            this.Container = container;
        }

        private IUnityContainer Container { get; set; }

        public object GetService(Type serviceType)
        {
            try
            {
                return this.Container.Resolve(serviceType);
            }
            catch (ResolutionFailedException)
            {
                return null;
            }
        }

        public IEnumerable<object> GetServices(Type serviceType)
        {
            try
            {
                return this.Container.ResolveAll(serviceType);
            }
            catch (ResolutionFailedException)
            {
                return new List<object>();
            }
        }

        public IDependencyScope BeginScope()
        {
            var child = this.Container.CreateChildContainer();
            return new UnityResolver(child);
        }

        public void Dispose()
        {
            this.Container.Dispose();
        }
    }
}