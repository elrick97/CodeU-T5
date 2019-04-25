package com.google.codeu.servlets;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.codeu.data.Datastore;
import com.google.codeu.data.Message;
import com.google.gson.Gson;
import java.io.IOException;
import java.util.List;
import java.util.logging.Logger; 
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.UUID;


@WebServlet("/reply")
public class ReplyServlet extends HttpServlet {

	private static final Logger log =  
		Logger.getLogger(ReplyServlet.class.getName()); 

	private Datastore datastore;

	@Override
	public void init() {
		datastore = new Datastore();
	}

	@Override
	public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

		UserService userService = UserServiceFactory.getUserService();
		if (!userService.isUserLoggedIn()) {
			response.sendRedirect("/index.html");
			return;
		}

		List<Message> messages = datastore.getAllMessages();
		String messageID = request.getParameter("mid");

		Message target = findMessage(messages, messageID);

		String user = userService.getCurrentUser().getEmail();
		String replyText = request.getParameter("replyText");
		String text = "<strong>"+user+"</strong>" + ": " + replyText;

		/*if(datastore == null){
		  init();
		  }*/
		//target.printMessage();
		target.replies.add(text);
		datastore.storeMessage(target);
		response.sendRedirect("/feed.html");
	}

	Message findMessage(List<Message> messages, String messageID){
		for(Message message : messages){
			if(message.getId().toString().equals(messageID)){
				log.info("******************MESSAGE FOUND********************** ");
				return message;
			}
		}
		return null;
	}
}
