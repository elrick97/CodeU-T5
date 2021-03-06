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

import java.util.UUID;
import java.util.ArrayList; 
import java.util.logging.Logger; 


/** A single message posted by a user. */
public class Message {

  private static final Logger log =  
      Logger.getLogger(Message.class.getName()); 

  private UUID id;
  private String user;
  private String text;
  private long timestamp;
  private String recipient;
  private String imageUrl;
  private String tag;
  public ArrayList<String> replies;
  private ArrayList <String> solved;
  /**
   * Constructs a new {@link Message} posted by {@code user} with {@code text} content. Generates a
   * random ID and uses the current system time for the creation time.
   */

  public Message(String user, String text, String recipient, String tag, ArrayList<String> replies, String imageUrl, ArrayList <String> solved) {
    this(UUID.randomUUID(), user, text, System.currentTimeMillis(), recipient, tag, replies, imageUrl, solved);
  }

  public Message(UUID id, String user, String text, long timestamp, String recipient, String tag, ArrayList<String> replies, String imageUrl, ArrayList<String> solved) {
    this.id = id;
    this.user = user;
    this.text = text;
    this.timestamp = timestamp;
    this.recipient = recipient;
    this.imageUrl = imageUrl;
    this.tag = tag;
    this.replies = replies;
    this.solved = new ArrayList<String>();//email
  }
  
  public String getTag(){
    return tag;
  }
  public String getRecipient() {
	 return recipient;
  }

  public UUID getId() {
    return id;
  }

  public String getUser() {
    return user;
  }

  public String getText() {
    return text;
  }

  public long getTimestamp() {
    return timestamp;
  }

  public String getImageUrl() { return imageUrl; }

  public void setImageUrl(String curImageUrl) { imageUrl = curImageUrl; }
  
  public ArrayList<String> getReplies(){
    return replies;
  }

  public void addReply(String replyText){
    replies.add(replyText);
  }

  public void printReplies(){
    for(String i : replies){
      log.info("reply: "+i);
    }
  }

  public void printMessage(){
    log.info("id: "+id);
    log.info("user: "+user);
    log.info("text: "+text);
    log.info("time: "+timestamp);
    log.info("recipient: "+recipient);
    log.info("tag: "+tag);
    printReplies();
  }
  public ArrayList<String> getSolved(){
	return solved;
  }
}
