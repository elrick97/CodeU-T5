/*
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.google.codeu.data;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.appengine.api.datastore.FetchOptions;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.logging.Logger; 


/**
 * Provides access to the data stored in Datastore.
 */
public class Datastore {

  private static final Logger log =  
      Logger.getLogger(Datastore.class.getName()); 

  private DatastoreService datastore;

  public Datastore() {
    datastore = DatastoreServiceFactory.getDatastoreService();
  }

  /** Stores the Message in Datastore. */
  public void storeMessage(Message message) {
    Entity messageEntity = new Entity("Message", message.getId().toString());
    messageEntity.setProperty("user", message.getUser());
    messageEntity.setProperty("text", message.getText());
    messageEntity.setProperty("timestamp", message.getTimestamp());
    messageEntity.setProperty("recipient", message.getRecipient());
    messageEntity.setProperty("tag", message.getTag());
    messageEntity.setProperty("replies", message.getReplies());
    messageEntity.setProperty("solved", message.getSolved());

    if (message.getImageUrl() != null) {
        messageEntity.setProperty("imageUrl", message.getImageUrl());
    }
    datastore.put(messageEntity);
  }

  public List<Message> getMessages(String recipient) {
    List<Message> messages = new ArrayList<>();
    PreparedQuery results;
    if(recipient == null || recipient == "") {
    	Query query =
                new Query("Message")
                        .addSort("timestamp", SortDirection.DESCENDING);
        results = datastore.prepare(query);
    }
    else{Query query =
            new Query("Message")
                    .setFilter(new Query.FilterPredicate("recipient", FilterOperator.EQUAL, recipient))
                    .addSort("timestamp", SortDirection.DESCENDING);
    	results = datastore.prepare(query);
    }
    return createMessage(results);
}
  
  /*
   * Fetch messages from all users
   *
   * @return a list of messages posted by all the users, or empty list if there are no messages at all.
   * List is sorted by time descending.
   * */
    public List<Message> getAllMessages() {
        Query query = new Query("Message")
                .addSort("timestamp", SortDirection.DESCENDING);
        PreparedQuery results = datastore.prepare(query);

        return createMessage(results);
    }
/*
 * Creating the message
 *
	 * @return a list of messages.
 * */
protected List<Message> createMessage(PreparedQuery results){
  List<Message> messages = new ArrayList<>();
    for (Entity entity : results.asIterable()) {
      try {
        String idString = entity.getKey().getName();
        UUID id = UUID.fromString(idString);
        String user= (String) entity.getProperty("user");
        String recipient = (String) entity.getProperty("recipient");
        String text = (String) entity.getProperty("text");
        String tag = (String) entity.getProperty("tag");
        long timestamp = (long) entity.getProperty("timestamp");
        ArrayList<String> replies = (ArrayList<String>) entity.getProperty("replies");
        ArrayList <String> solved = (ArrayList<String>) entity.getProperty("solved");
        String imageUrl = (String) entity.getProperty("imageUrl");
        
        Message message = new Message(id, user, text, timestamp, recipient, tag, replies, imageUrl, solved);
        messages.add(message);
      } catch (Exception e) {
        System.err.println("Error reading message.");
        System.err.println(entity.toString());
        e.printStackTrace();
      }
  }
  return messages;
}


    /**
     * Returns the total number of messages for all users.
     */
    public int getTotalMessageCount() {
        Query query = new Query("Message");
        PreparedQuery results = datastore.prepare(query);
        return results.countEntities(FetchOptions.Builder.withLimit(1000));
    }

    /**
     * Stores the User in Datastore.
     */
    public void storeUser(User user) {
        Entity userEntity = new Entity("User", user.getEmail());
        userEntity.setProperty("email", user.getEmail());
        userEntity.setProperty("aboutMe", user.getAboutMe());
        datastore.put(userEntity);
    }

    /**
     * Returns the User owned by the email address, or
     * null if no matching User was found.
     */
    public User getUser(String email) {

        Query query = new Query("User")
                .setFilter(new Query.FilterPredicate("email", FilterOperator.EQUAL, email));
        PreparedQuery results = datastore.prepare(query);
        Entity userEntity = results.asSingleEntity();
        if (userEntity == null) {
            return null;
        }

        String aboutMe = (String) userEntity.getProperty("aboutMe");
        User user = new User(email, aboutMe);

        return user;
    }
}
