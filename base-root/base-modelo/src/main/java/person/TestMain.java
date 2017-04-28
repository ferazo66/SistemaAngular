package person;

import java.util.ArrayList;
import java.util.Collection;

import org.hibernate.Session;

import gestor.BaseGestor;

public class TestMain {
  public static void main(String[] args) {
	 Person person = new Person();
//	 person.setName("eduardo");
	 Session session = HibernateUtil.getSessionFactory().openSession();
	 session.beginTransaction();
//	 session.save(person);
//	 session.getTransaction().commit();
	 BaseGestor hql= new BaseGestor();
	 Collection<Person> persona = new ArrayList<>();
	 persona = hql.consultaPersona();
	 for(Person p:persona){
		 System.out.println("nombre "+ p.getName());
	 }
	 session.close();
	 System.out.println("Done");
  }
} 