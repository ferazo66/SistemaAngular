package gestor;

import java.util.Collection;

import hql.ConsultaDAO;
import person.Person;

public class BaseGestor implements IConsultaHQL{
private ConsultaDAO consultahql = new ConsultaDAO();
	@Override
	public Collection<Person> consultaPersona() {
		// TODO Auto-generated method stub
		return this.consultahql.consultaPersona();
	}
	
}
