package hql;

import java.util.ArrayList;
import java.util.Collection;

import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.transform.Transformers;

import gestor.IConsultaHQL;
import person.HibernateUtil;
import person.Person;


public class ConsultaDAO implements IConsultaHQL{
//	private Session session;
//
//	private void iniciarOperacion(){
//		SessionFactory sessionFactory =new AnnotationConfiguration().configure().buildSessionFactory();
//		session =sessionFactory.openSession();
//		session.getTransaction().begin();
//	}
//	private void terminarOperacion(){
//		session.getTransaction().commit();
//		session.close();
//	}
	public Collection<Person> consultaPersona(){
		Session session;
		session=HibernateUtil.getSessionFactory().openSession();
		Collection<Person> consultaPersona = new ArrayList<Person>();
		Criteria criteria;
		ProjectionList projectionList;
		 try{
			 session.clear();
			 criteria= session.createCriteria(Person.class,"per");
			 projectionList = Projections.projectionList();
				projectionList.add(Projections.property("per.id"), "id");
				projectionList.add(Projections.property("per.name"), "name");
				criteria.setProjection(projectionList);
				criteria.setResultTransformer(Transformers.aliasToBean(Person.class));
				consultaPersona = (Collection<Person>) criteria.list();
			
		 } catch (HibernateException e) {
				}
		
		
		
		
		session.clear();
//		StringBuilder consulta= new StringBuilder();
//		consulta=consulta.append("SELECT id,name FROM ").append(Person.class.getName());
//	Query query=session.createQuery(consulta.toString());
//	Collection<Person> consultaPersona=query.list();
//	for(Object p: consultaPersona){
//		System.out.println(p.toString());
//	}
	return consultaPersona;
	}
}