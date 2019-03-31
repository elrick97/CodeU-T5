package com.google.codeu.servlets;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.codeu.data.Datastore;
import com.google.codeu.data.Message;
import com.google.gson.Gson;
import java.io.IOException;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/reply")
public class ReplyServlet extends HttpServlet {

	private Message message;

	@Override
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {



	}

	@Override
	public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

		UserService userService = UserServiceFactory.getUserService();
	    if (!userService.isUserLoggedIn()) {
	      response.sendRedirect("/index.html");
	      return;
	    }

	    String user = userService.getCurrentUser().getEmail();
	    String replyText = request.getParameter("replyText");
	    String text = user + ": " + replyText;

	    message.addReply(text);
        response.sendRedirect("/feed.html");
	}
}