/*
 Licensed to the Apache Software Foundation (ASF) under one
 or more contributor license agreements.  See the NOTICE file
 distributed with this work for additional information
 regarding copyright ownership.  The ASF licenses this file
 to you under the Apache License, Version 2.0 (the
 "License"); you may not use this file except in compliance
 with the License.  You may obtain a copy of the License at
 
 http://www.apache.org/licenses/LICENSE-2.0
 
 Unless required by applicable law or agreed to in writing,
 software distributed under the License is distributed on an
 "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, either express or implied.  See the License for the
 specific language governing permissions and limitations
 under the License.
 */

#import "Mangopay.h"
#import <mangopay/MPAPIClient.h>

@implementation Mangopay

- (void)registerCard:(CDVInvokedUrlCommand*)command {
    [self.commandDelegate runInBackground:^ {
        dispatch_queue_t mainQueue = dispatch_get_main_queue();

        MPAPIClient *mangopayClient;

        // initiate MPAPIClient with cardObject
        NSDictionary* cardObject = @{
            @"cardRegistrationURL" : [command.arguments objectAtIndex:0],
            @"preregistrationData" : [command.arguments objectAtIndex:1],
            @"accessKey" : [command.arguments objectAtIndex:2],
            @"clientId" : [command.arguments objectAtIndex:3],
            @"baseURL" : [command.arguments objectAtIndex:4],
            @"cardPreregistrationId" : [command.arguments objectAtIndex:5]
        };
        mangopayClient = [[MPAPIClient alloc] initWithCard:cardObject];
        
        // collect card info from the user
        NSString* cardNumber = [command.arguments objectAtIndex:6];             // ex: @"4706750000000009"
        NSString* cardExpirationMonth =  [command.arguments objectAtIndex:7];   // ex: @"10"
        NSString* cardExpirationYear =  [command.arguments objectAtIndex:8];    // ex: @"16"
        NSString* cardCvx = [command.arguments objectAtIndex:9];                // ex: @"123"
        
        [mangopayClient appendCardInfo: cardNumber
                         cardExpirationDate: [NSString stringWithFormat:@"%@%@", cardExpirationMonth, cardExpirationYear]                                    cardCvx: cardCvx];
        
        // register card
        [mangopayClient registerCard:^(NSDictionary *response, NSError *error) {
            CDVPluginResult* pluginResult = nil;
            
            if (error) {
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[error localizedDescription]];
            } else { // card was VALIDATED
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:response];
            }
            [pluginResult setKeepCallbackAsBool:NO];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        }];

    }];
}

@end
