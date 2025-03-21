import { View, TextInput, Button } from "react-native";
import React from "react";

export default function NotFoundScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}>
            <View style={{ padding: 6, width: '70%', gap: 2 }}>
                <TextInput style={{ borderWidth: 1, borderColor: "gray", borderRadius: 4 }} placeholder="Business Username" />
                <TextInput style={{ borderWidth: 1, borderColor: "gray", borderRadius: 4 }} placeholder="Password" />
                <TextInput style={{ borderWidth: 1, borderColor: "gray", borderRadius: 4 }} placeholder="Confirm Password" secureTextEntry={true} />
                <View style={{ borderRadius: 4 }}>
                    <Button title="Sign Up!"></Button>
                </View>
            </View>
        </View>
    );
}
